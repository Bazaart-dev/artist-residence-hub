const ProtectedRoute = ({ children }) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setVerified(!!session);
    });
  }, []);

  if (!verified) return <Navigate to="/" replace />;
  
  return children;
};
