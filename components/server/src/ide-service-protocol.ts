/**
 * Copyright (c) 2024 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { IDEClient, IDEOptions } from "@gitpod/gitpod-protocol/lib/ide-protocol";

export interface IDEConfig {
    supervisorImage: string;
    ideOptions: IDEOptions;
    clients?: { [id: string]: IDEClient };
}

export interface LazyIDEService {
    getIDEConfig: (userId: string) => Promise<IDEConfig>;
}
export const LazyIDEService = Symbol("LazyIDEService");
