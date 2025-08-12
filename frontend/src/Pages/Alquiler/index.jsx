import FormularioAlquiler from "../../Components/Forms/FormularioAlquiler"
import FormularioDevolucion from "../../Components/Forms/FormularioDevolucion"
import Layout from "../../Components/Layout"

const Alquiler = () => {

  return (
    <Layout>
      <div>Alquiler</div>
      <FormularioAlquiler />
      <FormularioDevolucion />
    </Layout>
  )
}

export default Alquiler