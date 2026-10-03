import CarritoProvider from "./CarritoContext";

export default function AppProvider({ children }) {
  return <CarritoProvider>{children}</CarritoProvider>;
}
