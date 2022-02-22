import { ArtService } from '@/modules/art/services';
import { CustomerService } from '@/modules/customer/customer.service';
import { FactoryService } from '@/modules/factory/factory.service';
import { ProjectService } from '@/modules/project/project.service';
import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProjectLoader {
  constructor(
    private projectService: ProjectService,
    private artService: ArtService,
    private customerService: CustomerService,
    private factoryService: FactoryService
  ) {}

  public readonly batchArts = new DataLoader(async (projectIds: string[]) => {
    const projects = await this.projectService.loadProjectsArts(projectIds);
    const projectsMap = new Map(projects.map((projects) => [projects.id, projects.arts]));

    return projectIds.map((projectId) => projectsMap.get(projectId));
  });

  public readonly batchFactories = new DataLoader(async (factoriesIds: string[]) => {
    const factories = await this.factoryService.getByIds(factoriesIds);
    const factoriesMap = new Map(factories.map((factory) => [factory.id, factory]));

    return factoriesIds.map((factoryId) => factoriesMap.get(factoryId));
  });

  public readonly batchCustomers = new DataLoader(async (customersIds: string[]) => {
    const customers = await this.customerService.getByIds(customersIds);
    const customersMap = new Map(customers.map((customer) => [customer.id, customer]));

    return customersIds.map((customerId) => customersMap.get(customerId));
  });
}
