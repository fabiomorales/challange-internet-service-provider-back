import { IListPlansResponse } from '@modules/plans/domain/models/IListPlansResponse copy';

export const reducePlansByPlanId = (plans: Array<any>): IListPlansResponse => {
  // Criar um objeto vazio que servirá como o objeto de resultado
  const listSerialized: any = {};

  // Percorrer a lista de planos
  plans.forEach(plan => {
    // Verificar se já existe um objeto com o mesmo plan_id no resultado
    if (listSerialized[plan.plan_id]) {
      // Se existir, adicionar o benefício ao array benefits do objeto
      listSerialized[plan.plan_id].benefits.push({
        id: plan.benefit_id,
        description: plan.description,
        img: plan.img,
        benefitType: plan.benefit_type,
      });
    } else {
      // Se não existir, criar um novo objeto com o plan_id correspondente
      listSerialized[plan.plan_id] = {
        id: plan.plan_id,
        name: plan.name,
        speed: Number(plan.speed),
        speedType: plan.speed_type,
        price: Number(plan.price),
        bestPlan: plan.best_plan,
        benefits: [
          {
            id: plan.benefit_id,
            description: plan.description,
            img: plan.img,
            benefitType: plan.benefit_type,
          },
        ],
      };
    }
  });

  // Converter o objeto de resultado em um array e retornar
  return Object.values(listSerialized);
};
