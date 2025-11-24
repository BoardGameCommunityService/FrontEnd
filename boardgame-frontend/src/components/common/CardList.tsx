import Card from "./Card"

export default function CardList (){
  const dummyPost = [{
    id:"a1er1z1",
    location:"서울시 종로구",
    title : "스플렌더 초고수만",
    currentMember: 3,
    maxMember:5,
    games:[
      "루미큐브","스플렌더","젠가"
    ]
  },{
    id:"a1er1z1",
    location:"서울시 종로구",
    title : "스플렌더 초고수만",
    currentMember: 3,
    maxMember:5,
    games:[
      "루미큐브","스플렌더","젠가"
    ]
  },{
    id:"a1er1z1",
    location:"서울시 종로구",
    title : "스플렌더 초고수만",
    currentMember: 3,
    maxMember:5,
    games:[
      "루미큐브","스플렌더","젠가"
    ]
  }]
  return (
    <div>
      <ul className="flex flex-col gap-0.5">
        {dummyPost.map((post,index)=>(
        <Card key={index} id={post.id} location={post.location} title={post.title} currentMember={post.currentMember} maxMember={post.maxMember} games={post.games}/>
        ))}
      </ul>
    </div>
  )
}