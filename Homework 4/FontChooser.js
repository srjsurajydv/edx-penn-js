'use strict';

class FontChooser extends React.Component {

  constructor(props) {
    super(props);
    var min = this.props.min;
    var max = this.props.max;
    var size = this.props.size;
    if (min < 1) {
      min = 1;
    }
    if (min > max) {
      max = min;
    }
    if (size < min) {
      size = min;
    } else if (size > max) {
      size = max;
    }
    this.state = {
      hidden: true,
      checked: this.props.bold,
      size: size,
      min: min,
      max: max,
      defaultSize: size
    };
  }

  render() {
    var size = this.state.size;
    var weight = this.state.checked ? 'bold' : 'normal';
    var hidden = this.state.hidden;
    var checked = this.state.checked;
    var color = (size == this.state.min || size == this.state.max) ?
      'red' : 'black';
    return (
      <div>
        <input type='checkbox' id='boldCheckbox' checked={checked}
        onChange={this.handleCheckbox.bind(this)} hidden={hidden}/>
        <button id='decreaseButton' 
        onClick={this.handleDecrease.bind(this)} hidden={hidden}>
          -
        </button>
        <span id='fontSizeSpan' 
        onDoubleClick={this.handleSizeDblClick.bind(this)} hidden={hidden}>
          {size}
        </span>
        <button id='increaseButton' 
        onClick={this.handleIncrease.bind(this)} hidden={hidden}>
        +
        </button>
        <span id='textSpan' 
        style={{fontSize: size, fontWeight: weight, color: color}} 
        onClick={this.handleTextClick.bind(this)}>
          {this.props.text}
        </span>
      </div>
    );
  }

  handleTextClick() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleCheckbox() {
    this.setState({ checked: !this.state.checked });
  }

  handleDecrease() {
    if (this.state.size > this.state.min) {
      this.setState({ size: this.state.size - 1 });
    }
  }

  handleIncrease() {
    if (this.state.size < this.state.max) {
      this.setState({ size: this.state.size + 1 });
    }
  }

  handleSizeDblClick() {
    this.setState({ size: this.state.defaultSize });
  }
}

FontChooser.defaultProps = {
  min: 28,
  max: 32,
  size: 30,
  text: 'Hello React!',
  bold: true
};