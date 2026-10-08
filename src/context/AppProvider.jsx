import CarritoProvider from "./CarritoContext";
import ProductosProvider from "./ProductosContext";

export default function AppProvider({ children }) {

  return(
    <ProductosProvider>
      <CarritoProvider>{children}</CarritoProvider>
    </ProductosProvider>
    

  )
   
}
