import withProtectedRoute from "@/modules/backend/with-protected-route";

export const getServerSideProps = withProtectedRoute(() => {
  return { redirect: { destination: "/settings/account", permanent: true } };
});
