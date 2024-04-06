import { ImageContaier, ProductDetails, ProdutContainer } from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {6

  const {query} = useRouter()

  return (
    <ProdutContainer>
      <ImageContaier>
        
      </ImageContaier>

      <ProductDetails>
        <h1>Camisa X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odio veniam similique, quia repellendus fuga ullam, quos.</p>
        <button>Comprar Agora</button>
      </ProductDetails>
    </ProdutContainer>
  );
}
