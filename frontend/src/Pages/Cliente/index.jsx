import Layout from "../../Components/Layout"
import FormularioCliente from "../../Components/Forms/FormularioCliente"
import FormularioClienteId from "../../Components/Forms/FormularioClienteId"
import { Contexto } from "../../Context"
import { useContext } from "react"
import CardHistorial from "../../Components/Cards/CardHistorial"

const Cliente = () => {
  
  const contexto = useContext(Contexto)

  return (
    <Layout>
      <FormularioCliente />
      <FormularioClienteId />
      {
        contexto.historial != null && (
          <CardHistorial historial={contexto.historial} />
        )
      }
      
    </Layout>
  )
}

export default Cliente