import nookies from 'nookies';
import { tokenService } from '../src/services/auth/tokenService';

function AuthPageSSR(props) {

  return (
    <div>
      <h1>
        Auth Page Server Side Render
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre> 
    </div>
  )
}

export default AuthPageSSR;

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  console.log('cookies', cookies);

  return {
    props: {
      token: tokenService.get(ctx),
    },
  }
}

/*
==== COMENTÁRIOS DA AULA ====
- Como esta página usa informações que precisam estar disponíveis e atualizadas no momento da renderização
é usado getServerSideProps.

- getServerSideProps é uma função que vai ser executada toda vez que a página for requisitada e seu retorno
será automaticamente fornecido para o componente da página como props. Primeiro vai executar o que estiver
em getServerSideProps e depois vai montar a página.

"Note that irrespective of rendering type, any props will be passed to the page component and can be viewed 
on the client-side in the initial HTML. This is to allow the page to be hydrated correctly. Make sure that 
you don't pass any sensitive information that shouldn't be available on the client in props."

A varíavel padrão de entrada para o getServerSideProps é o contexto da página a ser gerado, nele vão constar
os cookies por exemplo.

getServerSideProps só pode ser utilizado em arquivos que renderizam páginas, não pode ser utilizado em outros
tipos de arquivos.

- Neste caso a gente está printando todas as props geradas pelo getServerSideProps.

- Para buscar o token precisamos passar o contexto (ctx) da página para o tokenService.

*/
