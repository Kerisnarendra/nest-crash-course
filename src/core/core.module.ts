import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CommonModule],
    exports: [CommonModule]
})
export class CoreModule {}

// Benefits of Re-exporting Modules:
// 1. Simplified Imports: Re-exporting modules allows for a more streamlined import syntax. Instead of importing multiple individual modules, developers can import a single re-exported module that encapsulates the necessary functionality.
// 2. Encapsulation and Abstraction: Re-exporting modules can be used to encapsulate and abstract underlying functionality or implementation details. It provides a higher-level interface for other modules, promoting modular and clean code organization.
// 3. Code Reusability: Re-exporting modules facilitates code reuse by making modules available in a centralized location. This enables other modules to easily access and utilize the exported functionality without the need for explicit imports from different modules.

// Weaknesses of Re-exporting Modules:
// 1. Increased Indirection: Re-exporting modules introduces an additional layer of indirection in the codebase. This can make it harder to trace the origin of imported functionality, especially when multiple layers of re-exporting are involved.
// 2. Potential Dependency Conflicts: When re-exporting modules, it's important to consider potential conflicts or clashes between dependencies. If multiple modules re-export the same dependency, it can lead to versioning issues or unexpected behavior if the versions are not compatible.
// 3. Reduced Explicitness: Re-exporting modules can obscure the explicit dependencies of a module. This can make it more challenging for developers to understand the exact dependencies of a module and may lead to unintentional coupling between modules.