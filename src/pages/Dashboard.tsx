import { Button, Title } from "@mantine/core";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Title order={2}>Dashboard</Title>
      <Button mt="md" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
