import Search from "@/components/Search"
import { useSearchParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useGetPortfolio } from "@/ahooks/usePortfolio"

const Home = () => {
  const [searchParams] = useSearchParams()

  const getResult = useGetPortfolio({
    params: {
      limit: "10",
      page: searchParams.get("page") || "1",
      searchEmail: searchParams.get("searchEmail") || undefined,
      searchNumber: searchParams.get("searchNumber") || undefined,
    },
  })

  const { data: portfolioData, refetch, isLoading } = getResult

  useEffect(() => {
    refetch()

    window.scrollTo(0, 0)
  }, [refetch, searchParams])

  const formatNumberWithDashes = (number: number | string): string => {
    const numberStr = number.toString()
    return numberStr.replace(/(\d{2})(?=\d)/g, "$1-")
  }

  return (
    <div className="container ">
      <div className="paper-sharp flex-col sm:flex-row flex justify-between gap-4 mb-3">
        <Search
          searchName="searchEmail"
          placeholder="Search email"
          saveParam={["searchNumber"]}
        />
        <Search
          searchName="searchNumber"
          placeholder="Search number"
          saveParam={["searchEmail"]}
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
        )}
      >
        {portfolioData?.portfolios.map((item) => (
          <div key={item.id} className="paper-rounded p-3">
            <p>{item.email}</p>
            <p>{formatNumberWithDashes(item.number)}</p>
          </div>
        ))}
      </div>
      {isLoading && <div className="text-center">Loading...</div>}
      {!isLoading && portfolioData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
    </div>
  )
}

export default Home
