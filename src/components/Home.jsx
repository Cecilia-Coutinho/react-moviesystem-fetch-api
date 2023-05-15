import useFetch from "./useFetch"
import PeopleList from "./PeopleList"

const Home = () => {

  const { data: people, isPending, error } = useFetch('https://localhost:7294/api/person');

  return (
    <div className="home">

      {/*catch if there's an error*/}
      {error && <div> {error}</div>}

      {/*print loading*/}
      {isPending && <div> Loading...</div>}

      {/* print list of tasks with props: tasks, title and handleDelete */}
      {people && <PeopleList people={people} title="All People" />}

    </div>
  );
}

export default Home;
