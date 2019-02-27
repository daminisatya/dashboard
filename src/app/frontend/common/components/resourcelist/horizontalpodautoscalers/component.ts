// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpParams} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {HorizontalPodAutoscaler, HorizontalPodAutoscalerList} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {Observable} from 'rxjs/Observable';

import {ResourceListBase} from '../../../resources/list';
import {NotificationsService} from '../../../services/global/notifications';
import {EndpointManager, Resource} from '../../../services/resource/endpoint';
import {ResourceService} from '../../../services/resource/resource';

@Component({
  selector: 'kd-horizontalpodautoscalers-list',
  templateUrl: './template.html',
})

export class HorizontalpodautoscalersListComponent extends
    ResourceListBase<HorizontalPodAutoscalerList, HorizontalPodAutoscaler> {
  @Input() endpoint = EndpointManager.resource(Resource.horizontalPodAutoscaler).list();

  constructor(
      state: StateService,
      private readonly horizontalPodAutoscaler_: ResourceService<HorizontalPodAutoscalerList>,
      notifications: NotificationsService) {
    super('horizontalpodautoscalers', state, notifications);
  }

  getResourceObservable(params?: HttpParams): Observable<HorizontalPodAutoscalerList> {
    return this.horizontalPodAutoscaler_.get(this.endpoint, undefined, params);
  }

  map(horizontalPodAutoscalerList: HorizontalPodAutoscalerList): HorizontalPodAutoscaler[] {
    return horizontalPodAutoscalerList.horizontalpodautoscalers;
  }

  getDisplayColumns(): string[] {
    return [
      'name', 'namespace', 'creationTimestamp', 'minReplicas', 'maxReplicas',
      'currentCPUUtilizationPercentage', 'targetCPUUtilizationPercentage'
    ];
  }
}
