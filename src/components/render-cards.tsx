import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Loading from './loading';
import CardSelectModal from './card-select-modal';

interface MyProps {
  addFavorites: (param1: object) => void,
  deleteFavorites: (param1: number) => void,
  favorites: any[],
  addFocusedFighter: (param1: object) => void,
  focusedFighter: FighterProps,
  view: string,
  viewChange: (param1: string) => void
}

interface MyStates {
  fighterArray: object[],
  isLoading: boolean,
  modalIsOpen: boolean
}

interface FighterProps {
  fighter: string,
  fighterId: number,
  displayName: string,
  rosterId: number
};
interface EventProps {
  target?: any,
  matches?: any
}
export default class RenderCards extends React.Component<MyProps, MyStates> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      fighterArray: [],
      isLoading: false,
      modalIsOpen: false
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
    this.handleFavoriting = this.handleFavoriting.bind(this);
    this.handleHearts = this.handleHearts.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    try {
      const res = await axios.get('https://the-ultimate-api.herokuapp.com/api/fighters')
      if (res.status === 200) {
        this.setState({
          fighterArray: res.data
        });
      } else {
        throw Error(res.statusText);
      }
    } catch (e) {
      console.error('Fetch failed!', e);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  handleShowModal(event: any) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    this.props.addFocusedFighter({
      fighter: characterCard.cardName,
      fighterId: Number(characterCard.cardFighterId),
      rosterId: Number(characterCard.cardRosterId),
      displayName: characterCard.cardDisplayName
    });
    this.setState({ modalIsOpen: true })
  }

  handleCloseModal(event: any) {
    console.log(event.target.classList)
    if(event.target.matches('.character-card-modal')) {
      this.setState({ modalIsOpen: false });
    }
  }
  handleFavoriting(event: EventProps) {
    const heart = event.target;
    const currentCard = heart.closest('#character-card').dataset;
    for (let i = 0; i < this.props.favorites.length; i++) {
      if (this.props.favorites[i].fighterId === Number(currentCard.cardFighterId)) {
        return this.props.deleteFavorites(this.props.favorites[i].fighterId);
      }
    }
    const fav: FighterProps = {
      fighter: currentCard.cardName,
      fighterId: Number(currentCard.cardFighterId),
      displayName: currentCard.cardDisplayName,
      rosterId: Number(currentCard.cardRosterId)
    };
    this.props.addFavorites(fav);
  }

  handleHearts(id: number): string {
    for (const element of this.props.favorites) {
      const fighterId = element.fighterId
      if (id === fighterId) {
        return 'card-heart-favorited';
      }
    }
    return '';
  }

  checkView(): object[] {
    if (this.props.view === 'characterList' ||
      this.props.view === 'characterDetails') {
      return this.state.fighterArray;
    }
    return this.props.favorites;
  }

  noOneDigitNums(num: number) {
    return num < 10
      ? `0${num}`
      : num;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading />
      );
    }
    const selectList = this.checkView();
    const renderCards = (card: any) => {
      return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto'>
            <div onClick={this.handleShowModal} className='row character-card p-0' data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.displayName} />
                <span className='character-card-number'>{this.noOneDigitNums(card.fighterId)}</span>
                <i onClick={this.handleFavoriting} className={`fa-solid fa-heart card-heart ${this.handleHearts(card.fighterId)}`}></i>
                <h3 className='character-card-name'>{card.displayName}</h3>
              </div>
            </div>
          </Row>
        </React.Fragment>
      );
    }
    const allCards = selectList.map(renderCards);
    return (
      <Container fluid={'lg'} onClick={this.handleCloseModal} className="row content-layout" data-view='character-list'>
        <CardSelectModal modal={this.state.modalIsOpen} focusedFighter={this.props.focusedFighter} />
        {allCards}
      </Container>
    );
  }
}
