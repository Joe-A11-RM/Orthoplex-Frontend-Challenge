import { Helmet } from "react-helmet";

export default function LoginHelmet() {
  return (
    <Helmet>
      <title>Login</title>
      <meta
        name="description"
        content="Login to access your MyApp dashboard and manage your account."
      />
      <meta name="keywords" content="login, user login, MyApp, dashboard" />
      <meta name="author" content="Your Name or Company" />
      <meta property="og:title" content="Login - MyApp" />
      <meta
        property="og:description"
        content="Login to access your MyApp dashboard and manage your account."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content="/path/to/logo.png" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
