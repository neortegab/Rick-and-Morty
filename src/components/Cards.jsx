import Card from './Card';

export default function Cards(props) {
   const characters = props.characters;

   const charsCards = characters.map(character => <Card 
                                                      key={character.id} 
                                                      name={character.name}
                                                      status={character.status}
                                                      species={character.species}
                                                      gender={character.gender}
                                                      origin={character.origin}
                                                      image={character.image}>
                                                   </Card>)

   return (
   <div>
      {charsCards}
   </div>);
}
