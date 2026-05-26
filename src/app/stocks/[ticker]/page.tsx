import { Layout } from "@/components/Layout";
import { StockDetailClient } from "@/components/StockDetailClient";

export default async function StockDetailPage({
  params,
}: {
  params: { ticker: string };
}) {
  return (
    <Layout>
      <StockDetailClient ticker={decodeURIComponent(params.ticker)} />
    </Layout>
  );
}
