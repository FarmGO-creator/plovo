import React, {useEffect} from 'react';
import DishItem from "./DishItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishDeleteLoading, selectDishes, selectDishesFetchLoading} from "../../store/dishesSlice";
import {deleteDish, fetchDishes} from "../../store/dishesThunks";
import Spinner from "../Spinner/Spinner";

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectDishesFetchLoading);
  const deleteLoading = useAppSelector(selectDishDeleteLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const remove = async (id: string) => {
    if (window.confirm('Точно ?')) {
      await dispatch(deleteDish(id));
      await dispatch(fetchDishes());
    }
  };

  return (
    <>
      <h4>Dishes</h4>
      { fetchLoading ? <Spinner/> :  dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          onDelete={() => remove(dish.id)}
          deleteLoading={deleteLoading}
        />
      ))}
    </>
  );
};

export default Dishes;