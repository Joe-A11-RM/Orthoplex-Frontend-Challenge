import { Helmet } from "react-helmet";

export default function DashboardHelmet() {
  return (
    <Helmet>
      <title>Dashboard</title>

      <meta
        name="description"
        content="View your dashboard to explore products, brands, categories, and personalized user information."
      />
      <meta
        name="keywords"
        content="dashboard, user dashboard, products, brands, categories, ecommerce"
      />
      <meta name="author" content="Your Name or Company" />
      <meta property="og:title" content="Dashboard - MyApp" />
      <meta
        property="og:description"
        content="Access your personal dashboard to view products, brands, and categories."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content="/path/to/dashboard-preview.png" />

      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
