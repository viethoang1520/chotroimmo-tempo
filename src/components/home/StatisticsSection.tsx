import React from "react";

interface Statistics {
  customers: number;
  transactions: number;
  products: number;
  satisfaction: number;
}

interface StatisticsSectionProps {
  statistics?: Statistics;
}

const StatisticsSection = ({
  statistics = defaultStatistics,
}: StatisticsSectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Marketplace in Numbers
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied users on ChoTroiMMO
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-4xl font-bold">
              {statistics.customers.toLocaleString()}+
            </h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-4xl font-bold">
              {statistics.transactions.toLocaleString()}+
            </h3>
            <p className="text-muted-foreground">Successful Transactions</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-4xl font-bold">
              {statistics.products.toLocaleString()}+
            </h3>
            <p className="text-muted-foreground">Products Available</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-4xl font-bold">{statistics.satisfaction}%</h3>
            <p className="text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default statistics data
const defaultStatistics = {
  customers: 15000,
  transactions: 45000,
  products: 2500,
  satisfaction: 98,
};

export default StatisticsSection;
