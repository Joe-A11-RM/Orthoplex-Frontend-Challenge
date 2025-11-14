import { Helmet } from "react-helmet";

export default function SignUpHelmet() {
  return (
    <Helmet>
      <title>Register</title>
      <meta
        name="description"
        content="Create a new account on MyApp to access the dashboard and manage your profile."
      />
      <meta
        name="keywords"
        content="register, sign up, create account, MyApp"
      />
      <meta name="author" content="Your Name or Company" />
      <meta property="og:title" content="Register - MyApp" />
      <meta
        property="og:description"
        content="Create a new account on MyApp to access the dashboard and manage your profile."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content="/path/to/logo.png" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
