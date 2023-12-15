/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { FC, useCallback, useState } from "react";
import { Configuration } from "@gitpod/public-api/lib/gitpod/v1/configuration_pb";
import { ConfigurationSettingsField } from "./ConfigurationSettingsField";
import { Heading3, Subheading } from "@podkit/typography/Headings";
import { SwitchInputField } from "@podkit/switch/Switch";
import { TextMuted } from "@podkit/typography/TextMuted";
import { PrebuildSettingsForm } from "./prebuilds/PrebuildSettingsForm";
import { useConfigurationMutation } from "../../data/configurations/configuration-queries";
import { useToast } from "../../components/toasts/Toasts";

type Props = {
    configuration: Configuration;
};
export const ConfigurationDetailPrebuilds: FC<Props> = ({ configuration }) => {
    const { toast } = useToast();
    const updateConfiguration = useConfigurationMutation();

    const [enabled, setEnabled] = useState(!!configuration.prebuildSettings?.enabled);

    const updateEnabled = useCallback(
        (newEnabled: boolean) => {
            setEnabled(newEnabled);
            updateConfiguration.mutate(
                {
                    configurationId: configuration.id,
                    prebuildSettings: {
                        ...configuration.prebuildSettings,
                        enabled: newEnabled,
                    },
                },
                {
                    onError: (err) => {
                        toast(
                            <>
                                <span>
                                    {newEnabled
                                        ? "There was a problem enabling prebuilds"
                                        : "There was a problem disabling prebuilds"}
                                </span>
                                {err?.message && <p>{err.message}</p>}
                            </>,
                        );
                        setEnabled(!newEnabled);
                    },
                },
            );
        },
        [configuration.id, configuration.prebuildSettings, toast, updateConfiguration],
    );

    return (
        <>
            <ConfigurationSettingsField>
                <Heading3>Prebuilds</Heading3>
                <Subheading className="max-w-lg">Prebuilds reduce wait time for new workspaces.</Subheading>

                <SwitchInputField
                    className="mt-6"
                    id="prebuilds-enabled"
                    checked={enabled}
                    onCheckedChange={updateEnabled}
                    label={enabled ? "Prebuilds are enabled" : "Prebuilds are disabled"}
                    description={
                        <TextMuted>
                            Enabling requires permissions to configure repository webhooks.{" "}
                            <a
                                href="https://www.gitpod.io/docs/configure/projects/prebuilds"
                                className="gp-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn more
                            </a>
                            .
                        </TextMuted>
                    }
                />
            </ConfigurationSettingsField>

            {enabled && <PrebuildSettingsForm configuration={configuration} />}
        </>
    );
};