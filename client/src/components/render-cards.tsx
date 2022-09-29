/* eslint-disable no-restricted-globals */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardSelectModal from './card-select-modal';

interface MyProps {
  addFavorites: (param1: object) => void
  deleteFavorites: (param1: number) => void
  fighterArray: any[]
  favorites: any[]
}

interface MyStates {
  isLoading: boolean,
  modalIsOpen: boolean,
  focusedFighter: FighterProps
}

interface FighterProps {
  fighter: string,
  fighterId: number | null,
  displayName: string,
  rosterId: number | null
};
interface EventProps {
  target?: any,
  matches?: any
}
export default class RenderCards extends React.Component<MyProps, MyStates> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      isLoading: false,
      modalIsOpen: false,
      focusedFighter: {
        fighter: '',
        fighterId: null,
        displayName: '',
        rosterId: null
      }
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
    this.handleFavoriting = this.handleFavoriting.bind(this);
    this.handleHearts = this.handleHearts.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowModal(event: any) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    this.setState({
      focusedFighter: {
        fighter: characterCard.cardName,
        fighterId: Number(characterCard.cardFighterId),
        rosterId: Number(characterCard.cardRosterId),
        displayName: characterCard.cardDisplayName
      }
    });
    this.setState({ modalIsOpen: true })
  }

  handleCloseModal(event: any) {
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

  noOneDigitNums(num: number) {
    return num < 10
      ? `0${num}`
      : num;
  }
  homeOrFavorites() {

    const favRegex = new RegExp('favorites', 'g');
    if(favRegex.test(location.href)) {
      return this.props.favorites;
    } else {
      return this.props.fighterArray;
    }
  }
  render() {
    const allCards = this.homeOrFavorites().map((card: any) => {
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
    });
    return (
      <Container fluid={'lg'} onClick={this.handleCloseModal} className="row content-layout" data-view='character-list'>
        <CardSelectModal modal={this.state.modalIsOpen} focusedFighter={this.state.focusedFighter} />
        { allCards }
      </Container>
    );
  }
}
