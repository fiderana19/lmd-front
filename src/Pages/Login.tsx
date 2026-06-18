import { FunctionComponent, lazy, Suspense, useState } from "react";
const Typewriter = lazy(() => import("../components/Typewritter"));
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { LoginType } from "../types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "@/validation/user.validation";
import { useAuth } from "@/context/AuthContext";
import { LoadingOutlined, EyeOutlined, EyeInvisibleOutlined, UserOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";

const Login: FunctionComponent = () => {
  const { handleSubmit: submit, formState: { errors }, control } = useForm<LoginType>({
    resolver: yupResolver(LoginValidation),
  });
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const text = "LMD, L'APPLICATION DE GESTION DE NOTE UNIVERSITAIRE RESPECTANT LE REGIME LICENCE-MASTER-DOCTORAT";

  const submitLogin = async (data: LoginType) => { await login(data); };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-14 flex items-center px-8 border-b border-border/50 bg-card shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">LMD</span>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-six/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-six/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-six/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-primary/10" />

          <div className="relative z-10 flex flex-col justify-center px-16">
            <div className="max-w-lg">
              <div className="text-3xl font-bold font-lato text-foreground leading-tight mb-6">
                <Suspense fallback={<LoadingOutlined className="text-primary text-4xl" />}>
                  <Typewriter text={text} />
                </Suspense>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Gérez les notes, les étudiants, les UE et les EC en toute simplicité.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-six/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <div className="w-full max-w-sm">
            <div className="bg-card rounded-2xl shadow-2xl border border-border/50 p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserOutlined className="text-2xl text-primary" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-1">Connexion</h1>
                <p className="text-sm text-muted-foreground">Accédez à votre espace administrateur</p>
              </div>

              <form onSubmit={submit(submitLogin)} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="username">Utilisateur</Label>
                  <Controller name="username" control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <div className="relative">
                        <UserOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10" />
                        <Input value={value} onChange={onChange} onBlur={onBlur}
                          className={cn("pl-9", errors.username && "border-destructive")}
                          placeholder="Nom d'utilisateur" />
                      </div>
                    )}
                  />
                  {errors.username && <p className="text-xs text-destructive mt-1">{errors.username.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Controller name="password" control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <div className="relative">
                        <Input value={value} onChange={onChange} onBlur={onBlur}
                          type={showPassword ? "text" : "password"}
                          className={cn("pl-9", errors.password ? "border-destructive pr-10" : "pr-10")}
                          placeholder="Mot de passe" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </button>
                      </div>
                    )}
                  />
                  {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Se connecter
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="h-10 flex items-center justify-center text-xs text-muted-foreground border-t border-border/50 bg-card shrink-0">
        &copy; {new Date().getFullYear()} LMD - Tous droits réservés
      </footer>
    </div>
  );
};

export default Login;
