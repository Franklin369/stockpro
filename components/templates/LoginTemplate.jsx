import styled from "styled-components";
import {
  Btnsave,
  v,
  useAuthStore,
  InputText,
  useUsuariosStore,
  Spinner,
  SpinnerLoader,
  RegistrarAdmin,
  supabase,
} from "../../index";
import estrellas from "../../assets/estrellasVarias.svg";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export function LoginTemplate() {
  const { insertarUsuario } = useUsuariosStore();
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [stateInicio, setStateInicio] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const p = {
        correo: "frank@gmail.com",
        pass: "gTh1238",
      };
      await insertarUsuario(p);
    },
  });
 const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  async function iniciar(data) {
    const response = await signInWithEmail({
      correo: data.correo,
      pass: data.pass,
    });
    if (response) {
      navigate("/");
    } else {
      setStateInicio(!stateInicio);
    }
  }
 
  return (
    <div>
     
      <Container imgfondo={v.imagenfondo}>
        <div className="contentCard">
          {state && <RegistrarAdmin setState={() => setState(!state)} />}

          <div className="contentImg">
            <img src={v.logo} />
          </div>
          <Titulo>StockPRO</Titulo>
          {stateInicio && (
            <TextoStateInicio>datos incorrectos</TextoStateInicio>
          )}

          <p className="frase">
            Controla tu inventario de forma facil y rapida.
          </p>
          <form onSubmit={handleSubmit(iniciar)}>
            <InputText icono={<v.iconoemail />}>
              <input
                className="form__field"
                onChange={(e) => setCorreo(e.target.value)}
                type="text"
                placeholder="email"
                {...register("correo", {
                  required: true,
                })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText icono={<v.iconopass />}>
              <input
                className="form__field"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="contraseña"
                {...register("pass", {
                  required: true,
                })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <ContainerBtn>
              <Btnsave  titulo="Iniciar" bgcolor="#fc6b32" />
              <Btnsave
                funcion={() => setState(!state)}
                titulo="Crear cuenta"
                bgcolor="#ffffff"
              />
            </ContainerBtn>
          </form>
        </div>
      </Container>
    </div>
  );
}
const Container = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  background-image: url(${estrellas});
  background-color: #000;

  .contentCard {
    position: relative;
    background: ${({ theme }) => theme.bgtotal};
    border-radius: 20px;
    gap: 30px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 80%;
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #909090;
      font-size: 1.2rem;
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
margin-top:15px;
  display: flex;
  justify-content: center;
`;
const TextoStateInicio = styled.p`
  color: #fc7575;
`;
