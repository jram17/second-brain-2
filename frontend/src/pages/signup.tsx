import { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"
import { CircleX, TriangleAlert } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";
import { BASEURL } from "../config/axiosConfig";
import { Header } from "../components/header";
const Signup = () => {


  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const signupResponse = await axios.post(`${BASEURL}/api/v1/signup`, {
        username,
        password
      });
      if (!signupResponse.data.status) {
        toast.error("user already existing");
      }

      axios.defaults.withCredentials = true;
      const response = await axios.post(`${BASEURL}/api/v1/signin`, {
        username,
        password,
      });
      console.log({ "response object :": response.data })
      sessionStorage.setItem("access_token", response.data.token);
      sessionStorage.setItem("username", String(username))

      toast.success(`Welcome back, ${username}!`, {
        action: {
          label: <CircleX className="text-gray-500 hover:text-red-500  cursor-pointer" />,
          onClick: () => {
            console.log("close");
          },
        }
      });

      navigate("/brain");

    } catch (error) {
      console.log(error);

      console.error("Error during sign-in:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 411) {
          toast.error("user already exits!!!");
        }

        if (status === 400) {
          toast.error("user already exits");
        } else if (status === 403) {
          toast.error('Invalid credentials, Please try again!!!', {

            action: {
              label: <CircleX className="text-gray-500 hover:text-red-500 cursor-pointer" />,
              onClick: () => toast.dismiss(),
            },
          });
        } else if (status === 500) {
          toast.error("Server error. Please try again later.", {
            action: {
              label: <CircleX className="text-gray-500 hover:text-red-500 cursor-pointer" />,
              onClick: () => {
                console.log("close");
              },
            }
          });
        } else {
          toast.error("An unknown error occurred.");
        }
      } else {
        console.error("Unexpected error:", error);
      }

    }
  };
  const location = useLocation();

  return (<>
    <Header path={location.pathname} />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle><p className="text-">Sign Up</p></CardTitle>
          <CardDescription>
            {"Create your new account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input ref={usernameRef} id="username" placeholder="Username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {"Sign Up"}
            </Button>

          </CardFooter>
        </form>
      </Card>
    </div>
  </>
  )
}

export default Signup
