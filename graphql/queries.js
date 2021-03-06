import { gql } from "@apollo/client";

export const GET_BLOGPOSTS = gql`
query {
  characters(page: 2, filter: { name: "rick" }) {
    results {
      name
    }
  }
}
`;
export const CREAREMPRESA = gql`
mutation (
  $nit: String!,
  $digitoVerificacion: String!,
  $razonSocial: String!,
  $direccion: String!,
  $ciudad: String!,
  $body: String!
  ){
  createEmpresa(
   nit: $nit,
   digitoVerificacion: $digitoVerificacion,
   razonSocial: $razonSocial,
   direccion: $direccion,
   ciudad: $ciudad,
   body: $body
 ){
   id
   nit
   digitoVerificacion
   razonSocial
   direccion
   ciudad
   body
 }
 }
`;
export const CREAR_IMPUESTO = gql`
  mutation(
    $empresaId:ID!, $impuesto:String!, $comentario:String!
  ){
    createImpuesto(
      empresaId:$empresaId,
      impuesto:$impuesto,
      responsabilidad:1,
      comentario:$comentario
    ){
      impuesto
      responsabilidad
      comentario
    }
  }
`;
export const CREAR_CLAVE = gql`
mutation($empresaId:ID!, $entidad:String!, $usuario:String!, $contrasenna:String!, $comentario:String!){
  createClave(
  	empresaId:$empresaId,
    entidad:$entidad,
    usuario:$usuario,
    contrasenna:$contrasenna,
    comentario:$comentario,
  ){
    entidad
    usuario
    contrasenna
    comentario
  }
}
`;
export const GET_EMPRESAS = gql`
query {
  empresas{
    id
    nit
    razonSocial
    direccion
    ciudad
    responsabilidad{
      id
      impuesto
      responsabilidad
      comentario
    }
    claves{
      id
      entidad
      usuario
      contrasenna
      comentario
    }
  }
}
`;
export const GET_EMPRESA = gql`
query($id:ID!) {
  empresa(id:$id){
    id
    nit
    razonSocial
    direccion
    ciudad
    logo
    responsabilidad{
      id
      impuesto
      responsabilidad
      comentario
    }
    claves{
      id
      entidad
      usuario
      contrasenna
      comentario
    }
  }
}
`;
export const MODIFICAR_COMENTARIO_IMPUESTO = gql`
mutation ModificarComentarioImpuesto($id: ID!, $comentario: String!){
  modificarComentarioImpuesto(
    id: $id,
    comentario: $comentario
  ){
    id
    impuesto
    comentario
  }
}
`;
export const MODIFICAR_CONTRASENIAS = gql`
mutation ActualizarClaves($id: ID!, $usuario: String!, $contrasenna: String!, $comentario: String!){
  actualizarClaves(
  	id: $id,
    usuario: $usuario,
    contrasenna: $contrasenna,
    comentario: $comentario
  ){
    id
    entidad
    usuario
    contrasenna
    comentario
  }
}
`;
export const LOGIN = gql`
   mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password)
   }
`;
export const GET_USUARIO = gql`
query($id:ID!) {
  user(id:$id){
    username
    email
    displayName
    foto
  }
}
`;





export const EDIT_BLOGPOST = gql`
  mutation EditBlogPost($id: String, $text: String) {
    editBlogPost(id: $id, text: $text) {
      id 
      text
    }
  }
`