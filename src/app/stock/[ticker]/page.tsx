import { Layout } from "@/components/Layout";
import { StockDetailClient } from "@/components/StockDetailClient";

export default function StockDetailPage({
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
