# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM cgr.dev/chainguard/wolfi-base:latest@sha256:5e9c9e30b1a3ba73b10574792b719067a4bd30c25eea505e447ed49ff3bcde42
COPY components--all-docker/versions.yaml components--all-docker/provenance-bundle.jsonl /
