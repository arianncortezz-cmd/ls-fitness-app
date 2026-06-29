import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import PersonalDashboard from "@/pages/personal-dashboard";
import StudentsList from "@/pages/students/list";
import NewStudent from "@/pages/students/new-student";
import StudentProfile from "@/pages/students/profile";
import EditStudent from "@/pages/students/edit-student";
import NotFound from "@/pages/not-found";
import { StudentsProvider } from "@/context/students-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/personal-dashboard" component={PersonalDashboard} />
      <Route path="/students" component={StudentsList} />
      <Route path="/students/new" component={NewStudent} />
      <Route path="/students/:id/edit" component={EditStudent} />
      <Route path="/students/:id" component={StudentProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StudentsProvider>
          <WouterRouter>
            <Router />
          </WouterRouter>
          <Toaster />
          <SonnerToaster position="top-right" richColors />
        </StudentsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
