import semver from 'semver';
import meta from 'Root/package.json';

export default ({ version }) => version ? semver.satisfies(meta.version, version) : false;
