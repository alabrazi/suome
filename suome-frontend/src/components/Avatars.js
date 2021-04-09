
const selectavator =()=>{
  const avatars = ['/avatars/girl1.svg','/avatars/girl2.svg',
  '/avatars/girl3.svg','/avatars/boy.svg']
  const rand_key = Math.floor(Math.random()* avatars.length);
  return avatars[rand_key]

}

export {selectavator};
