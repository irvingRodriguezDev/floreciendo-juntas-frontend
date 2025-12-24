import { Card, CardContent, Skeleton } from "@mui/material";

export default function ShopifyProductSkeleton() {
  return (
    <Card>
      <Skeleton variant='rectangular' height={140} />
      <CardContent>
        <Skeleton width='80%' />
        <Skeleton width='60%' />
        <Skeleton height={40} />
      </CardContent>
    </Card>
  );
}
