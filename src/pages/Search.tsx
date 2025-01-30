import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import NavbarComponent from "../components/NavbarComponent";
import { useSearchMutation } from "../state/slices/searchApiSlice";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, { data: results, isLoading }] = useSearchMutation();
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      await search(query).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(searchParams.get("search") as string);
  }, [searchParams.get("search")]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="bg-light">
      <NavbarComponent />
    </div>
  );
}

export default Search;
