export default class Chart extends Component {
  render() {
    return (
      React.createElement(AmCharts.React, {
        style: {
          width: "100%",
          height: "500px"
        },
        options: {
          "type": "serial",
          "theme": "light"
        }
      })
    )
  }
}

