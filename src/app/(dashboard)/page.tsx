import RevenueChart from "@/components/modules/RevenueChart"
import StatCards from "@/components/modules/StatCards"

export default function Dashboard(){
    return(
    <div className="p-6 flex flex-col gap-6">
        <StatCards></StatCards>
        <RevenueChart />
    </div>
    )
}