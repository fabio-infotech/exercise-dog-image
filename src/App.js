import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: '',
      array: [],
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.saveData = this.saveData(this);
  }

  componentDidMount() {
    const { data } = this.state;
    if(data.message)
    {
      if (localStorage.dogURL) {
        const parseStorage = JSON.parse(localStorage.dogURL);
        const lastDog = parseStorage[parseStorage.length - 1].message;
        return this.setState({ data: { message: lastDog } });
      }
    }
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, array } = this.state;
    if (prevState.data !== data) {        
      const dogBreed = data.message.split('/'[4]);
      alert(dogBreed);
    }
    localStorage.setItem('dogURL', JSON.stringify(array));
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(result => this.setState({ data: result }));
  }

  saveData() {
    const {
      data: { message },
      name,
      array,
    } = this.state;
    const dogData = { message, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray });
    this.setState({ name: '' });
  }

  render() {
    const { data, name } = this.state;
    if (data === '') return 'loading...';
    return (
      <div>
        <p>Doguinhos</p>
        <button onClick={this.fetchDog}>Novo doguinho!</button>
        <div>
          <input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="digite o nome do doguinho"
          />
          <button onClick={this.saveData}>Salvar doguinho!</button>
        </div>
        <div>
          <img src={data.message} alt={data.message}/>
        </div>
      </div>
    );
  }
}

export default App;
