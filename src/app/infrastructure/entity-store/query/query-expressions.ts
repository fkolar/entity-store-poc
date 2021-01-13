import {AndPredicate, EqPredicate, Predicate} from './grammar/predicate';


export function and<TModel>(left: Predicate<TModel>, right: Predicate<TModel>): AndPredicate<TModel> {
  return new AndPredicate<TModel>([left, right]);
}


export function eq<TModel,
  TProperty extends keyof TModel,
  TPropertyValue extends TModel[TProperty]>(property: TProperty, value: TPropertyValue): EqPredicate<TModel, TProperty, TPropertyValue> {
  return new EqPredicate<TModel, TProperty, TPropertyValue>(property, value);
}



