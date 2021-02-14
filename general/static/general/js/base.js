/* global $ */

class Component {
  constructor(props) {
    
    // fields:
    this.props = props;
    this.attrs = {};
    
    // element:
    if (this.props.body) this.attrs.body = $('#' + this.props.body);
    
  }
}