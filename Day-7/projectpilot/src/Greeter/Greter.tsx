import React from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// class Greeter extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }
// (props: any) {
//   // const first = props.first;
//   // const last = props.last;
//   const { first, last } = props;
//   return (
//     <h1>
//       Hello, {first} {last}
//     </h1>
//   );
// }


//eslint-disable-next-line @typescript-eslint/no-explicit-any
function Greeter(props: any) {
  // const first = props.first;
  // const last = props.last;
  const { first, last } = props;
  return (
    <h1>
      Hello, {first} {last}
    </h1>
  );
}
// function Greeter({ first, last }) {
//   // const { first, last } = props;
//   return (
//     <h1>
//       Hello, {first} {last}
//     </h1>
//   );
// }



//USE PROPTYPES
// function Greeter(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// Greeter.propTypes = {
//   name: PropTypes.string.isRequired,
// };




export default Greeter;

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Greeter first="Joe" />
// );