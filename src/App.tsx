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
import StudentAssessments from "@/pages/students/assessments";
import NewAssessment from "@/pages/students/new-assessment";
import WorkoutsList from "@/pages/workouts/list";
import WorkoutView from "@/pages/workouts/view";
import NewWorkout from "@/pages/workouts/new";
import WorkoutsByStudent from "@/pages/workouts/by-student";
import LibraryList from "@/pages/Library/list";
import NewLibraryExercise from "@/pages/Library/new";
import Schedule from "@/pages/schedule/index";
import NewScheduleEvent from "@/pages/schedule/new";
import Finance from "@/pages/finance/index";
import NotFound from "@/pages/not-found";
import { StudentsProvider } from "@/context/students-context";
import { WorkoutsProvider } from "@/context/workouts-context";
import { LibraryProvider } from "@/context/library-context";
import { AssessmentsProvider } from "@/context/assessments-context";
import { ScheduleProvider } from "@/context/schedule-context";
import { PaymentsProvider } from "@/context/payments-context";

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
      <Route path="/students/:id/workouts/new" component={NewWorkout} />
      <Route path="/students/:id/workouts" component={WorkoutsByStudent} />
      <Route path="/students/:id/assessments/new" component={NewAssessment} />
      <Route path="/students/:id/assessments" component={StudentAssessments} />
      <Route path="/students/:id" component={StudentProfile} />
      <Route path="/workouts" component={WorkoutsList} />
      <Route path="/workouts/new" component={NewWorkout} />
      <Route path="/workouts/:id" component={WorkoutView} />
      <Route path="/library/new" component={NewLibraryExercise} />
      <Route path="/library" component={LibraryList} />
      <Route path="/schedule/new" component={NewScheduleEvent} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/finance" component={Finance} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StudentsProvider>
          <WorkoutsProvider>
            <LibraryProvider>
              <AssessmentsProvider>
                <ScheduleProvider>
                  <PaymentsProvider>
                    <WouterRouter
                      base={import.meta.env.BASE_URL.replace(/\/$/, "")}
                    >
                      <Router />
                    </WouterRouter>
                    <Toaster />
                    <SonnerToaster position="top-right" richColors />
                  </PaymentsProvider>
                </ScheduleProvider>
              </AssessmentsProvider>
            </LibraryProvider>
          </WorkoutsProvider>
        </StudentsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
