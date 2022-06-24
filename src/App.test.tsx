// import React,{ useState, useEffect } from 'react';
// import { render, screen } from '@testing-library/react';
// import Home from './pages/home';
// import FighterDetails from './pages/fighter-details';
// import FavoritesList from './pages/favorites';
// import Navbar from './components/navbar';
// import BackgroundCarousel from './components/background-carousel';
// const shallow = require('enzyme/shallow');
// const Enzyme = require('enzyme');
// const Adapter = require('enzyme-adapter-react-16');
// const reactTestRenderer = require('react-test-renderer');

// Enzyme.configure({ adapter: new Adapter() });
// // test('renders learn react link', () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// export default function App() {
//   const [currentView, setCurrentView]: any[] = useState('characterList');
//   const [focusedFighter, setFocusedFighter]: any[] = useState({});
//   const [favorites, setFavorites]: any[] = useState([]);

//   useEffect(() => {
//     const itemName: string | null = localStorage.getItem('favorites');
//     if (itemName) {
//       const favorites: any = JSON.parse(itemName);
//       setFavorites(favorites);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   function handleViewChange(newView: string): void {
//     setCurrentView(newView);
//   }

//   function handleCurrentFighter(obj: any) {
//     if (obj === null) {
//       setFocusedFighter({});
//       return;
//     }
//     setFocusedFighter(obj);
//   }

//   function handleAddFavorites(fav: object | undefined) {
//     const newFavorites: any[] = [...favorites, fav]
//     setFavorites(newFavorites.sort((a: any, b: any) => (a.fighterId > b.fighterId) ? 1 : -1));
//   }
//   function handleDeleteFavorites(id: number): void {
//     interface Fav {
//       fighterId: number
//     }
//     if (favorites.length === 1) {
//       setFavorites([]);
//     }
//     function filterFav(fav: Fav): number | undefined {
//       if (fav.fighterId !== id) {
//         return fav.fighterId
//       }
//     }
//     setFavorites(favorites.filter(filterFav));
//   }

//   let view = null;
//   if (currentView === 'characterList') {
//     view =
//       <>
//         <BackgroundCarousel />
//         <Home
//           view={currentView}
//           viewChange={handleViewChange}
//           focusedFighter={handleCurrentFighter}
//           favorites={favorites}
//           addFavorites={handleAddFavorites}
//           deleteFavorites={handleDeleteFavorites}
//         />;
//       </>;
//   } else if (currentView === 'favoritesList') {
//     view =
//       <>
//         <BackgroundCarousel />
//         <FavoritesList
//           view={currentView}
//           viewChange={handleViewChange}
//           focusedFighter={handleCurrentFighter}
//           favorites={favorites}
//           addFavorites={handleAddFavorites}
//           deleteFavorites={handleDeleteFavorites}
//         />;
//       </>;
//   } else if (currentView === 'characterDetails') {
//     view =
//       <>
//         <BackgroundCarousel />
//         <FighterDetails focusedFighter={focusedFighter} />
//       </>;
//   }
//   return (
//     <>
//       <header>
//         <Navbar viewChange={handleViewChange} view={currentView} />
//       </header>
//       <main>
//         {view}
//       </main>
//     </>
//   );
// }

// // const testRenderer: any = reactTestRenderer.create( <App /> );
// // const testInstance: any = testRenderer.root;
// const wrapper: any = shallow( <App />)

// it('tests shallow App', () => {
//   // expect(testRenderer.toJSON()).toBeFalsy();
//   wrapper.setState({ currentView: 'favoritesList' })
//   expect(wrapper.find(FavoritesList).length).toBe(1)
// })

// // test('tests setState on App component', () => {
// //   testRenderer.setState( {currentView: 'characterList'} )
// //   expect(testRenderer.find(BackgroundCarousel).length).toBe(1);
// // })

// // let root: any;
// // testRenderer.act(() => {
// //   root = testRenderer.create(<App value={1} />)
// // });

// // // make assertions on root
// // expect(root.toJSON()).toMatchSnapshot();

// // // update with some different props
// // testRenderer.act(() => {
// //   root.update(<App value={2} />);
// // })

// // // make assertions on root
// // expect(root.toJSON()).toMatchSnapshot();
