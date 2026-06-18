import { FunctionComponent, lazy, Suspense, useState } from "react";
const Typewriter = lazy(() => import("../components/Typewritter"));
import Bg from "../assets/pic/home-bg.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { LoginType } from "../types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "@/validation/user.validation";
import { useAuth } from "@/context/AuthContext";
import { LoadingOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import FormField from "@/components/shared/FormField";

const Login: FunctionComponent = () => {
  const { handleSubmit: submit, formState: { errors }, control } = useForm<LoginType>({
    resolver: yupResolver(LoginValidation),
  });
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const text = "LMD, L'APPLICATION DE GESTION DE NOTE UNIVERSITAIRE RESPECTANT LE REGIME LICENCE-MASTER-DOCTORAT";

  const submitLogin = async (data: LoginType) => { await login(data); };

  return (
    <div className="h-screen bg-gradient-to-br from-primary/5 via-background to-six/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="block sm:flex sm:justify-between h-full">
        <div className="relative flex flex-col justify-center w-full sm:w-2/3 px-6 sm:px-16 lg:px-24">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col justify-center w-full max-w-lg mb-4">
            <img src={Bg} className="w-44" alt="" />
          </div>
          <div className="relative sm:text-3xl text-2xl text-center sm:text-left font-bold font-lato max-w-lg text-foreground">
            <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
              <Typewriter text={text} />
            </Suspense>
          </div>
          <p className="relative mt-4 text-muted-foreground text-sm sm:text-base text-center sm:text-left max-w-lg">
            Gérez les notes, les étudiants, les UE et les EC en toute simplicité.
          </p>
        </div>
        <div className="bg-card w-full sm:w-1/3 flex flex-col justify-center items-center px-6 py-12 sm:py-0 shadow-2xl border-l border-border/50">
          <div className="w-full max-w-xs">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Connexion</h1>
              <p className="text-sm text-muted-foreground">Accédez à votre espace administrateur</p>
            </div>
            <form onSubmit={submit(submitLogin)} className="w-full space-y-5">
              <FormField label="Utilisateur" name="username" control={control} error={errors.username}>
                <Input placeholder="Nom d'utilisateur" />
              </FormField>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Controller name="password" control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input value={value} onChange={onChange} onBlur={onBlur}
                        type={showPassword ? "text" : "password"}
                        className={errors.password ? "border-destructive pr-10" : "pr-10"}
                        placeholder="Mot de passe" />
                    )}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
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
  );
};

export default Login;
