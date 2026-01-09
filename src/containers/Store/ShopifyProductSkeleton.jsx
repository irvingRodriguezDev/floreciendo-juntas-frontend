import { Box, Card, CardContent, Divider, Skeleton } from "@mui/material";

export default function ShopifyProductSkeleton() {
  return (
    <Card sx={{ borderRadius: 6, border: "1px solid #F6E6EF", height: "100%" }}>
      <Skeleton
        variant='rectangular'
        height={320}
        sx={{ borderRadius: "20px", m: 1 }}
      />
      <CardContent sx={{ p: 3 }}>
        <Skeleton width='60%' height={40} sx={{ mb: 2 }} />
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 1 }}>
          <Skeleton width='90%' height={30} />
        </Box>
        <Box sx={{ mb: 1 }}>
          <Skeleton width='80%' height={30} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Skeleton width='85%' height={30} />
        </Box>
        <Skeleton
          variant='rounded'
          width='100%'
          height={50}
          sx={{ borderRadius: 999 }}
        />
      </CardContent>
    </Card>
  );
}
