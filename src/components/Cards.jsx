import Card from './Card';
import './styles/Cards.css'

export default function Cards(props) {
   const characters = props.characters;

   const charsCards = characters.map(
      character => <Card 
      key={character.id} 
      name={character.name}
      status={character.status}
      species={character.species}
      gender={character.gender}
      origin={character.origin}
      image={character.image}
      onClose={props.onClose}
      characterToClose={character.id}
      />)

   return (
   <div className='cards_container'>
      {characters && charsCards}
   </div>);
}
