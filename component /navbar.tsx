interface Title{
    name: string;
}
export default function Navbar(prop: Title){
    return(
        <div className="navbar border-b-2 border-white bg-base-100">
  <a className="btn pl-8 font-black btn-ghost text-xl">{prop.name}</a>
</div>
    )
}