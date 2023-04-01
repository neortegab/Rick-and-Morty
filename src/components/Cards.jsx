import Card from './Card';
import './styles/Cards.css'

export default function Cards(props) {
   const characters = props.characters;

   const charsCards = characters.map(
      (character, index) => <Card 
      key={index} 
      id={character.id}
      name={character.name}
      status={character.status}
      species={character.species}
      gender={character.gender}
      origin={character.origin.name}
      image={character.image}
      onClose={props.onClose}
      />)

   return (
   <div className='cards_container'>
      {characters && charsCards}
   </div>);
}
